const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const jwt = require('jsonwebtoken');
const User = require('./Models/User');
const Event = require('./Models/Event');
const ContactInquiry = require('./Models/ContactInquiry');

const app = express();
const allowedOrigins = new Set([
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean));

app.use(
  cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin is not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '100kb' }));

function requireAuth(req, res, next) {
    const authorization = req.get('authorization');
    const [scheme, token] = authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.post('/api/register', async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body ?? {};
        if (![fullname, email, password, phone].every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ message: 'Enter a valid email address' });
        }
        const normalizedPhone = phone.trim();
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: existingUser.email === normalizedEmail
                    ? 'Email already registered'
                    : 'Phone number already registered',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname: fullname.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phone: normalizedPhone,
        });
        await newUser.save();
        return res.status(201).json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('Registration failed:', error);
        return res.status(error.code === 11000 ? 409 : 500).json({
            message: error.code === 11000 ? 'Email or phone number already registered' : 'Registration failed',
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { phone, password } = req.body ?? {};
        if (typeof phone !== 'string' || !phone.trim() || typeof password !== 'string' || !password) {
            return res.status(400).json({ message: 'Phone number and password are required' });
        }

        const existingUser = await User.findOne({ phone: phone.trim() });

        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatches) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                phone: existingUser.phone
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: existingUser._id,
                fullname: existingUser.fullname,
                phone: existingUser.phone
            }
        });
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ message: 'Login failed' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const {
            fullName,
            phone,
            email,
            eventType,
            eventDate = '',
            eventCity = '',
            budget = '',
            message = '',
        } = req.body ?? {};
        const requiredFields = [fullName, phone, email, eventType];

        if (!requiredFields.every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({ message: 'Name, phone, email, and event type are required' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({ message: 'Enter a valid email address' });
        }
        if (![eventDate, eventCity, budget, message].every((value) => typeof value === 'string')) {
            return res.status(400).json({ message: 'Invalid contact form data' });
        }

        const inquiry = await ContactInquiry.create({
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            eventType: eventType.trim(),
            eventDate: eventDate.trim(),
            eventCity: eventCity.trim(),
            budget: budget.trim(),
            message: message.trim(),
        });

        return res.status(201).json({
            message: 'Message sent successfully. Our team will be in touch.',
            inquiryId: inquiry._id,
        });
    } catch (error) {
        console.error('Failed to save contact inquiry:', error);
        return res.status(500).json({ message: 'Failed to send message' });
    }
});

app.post('/api/events', requireAuth, async (req, res) => {
    try {
        const { Eventimage, Title, Description } = req.body ?? {};

        if (![Eventimage, Title, Description].every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEvent = new Event({
            Eventimage: Eventimage.trim(),
            Title: Title.trim(),
            Description: Description.trim(),
        });

        await newEvent.save();

        return res.status(201).json({
            message: 'Event added successfully',
            event: newEvent,
        });
    } catch (error) {
        console.error('Failed to add event:', error);
        return res.status(500).json({ message: 'Failed to add event' });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        return res.status(200).json(events);
    }
    catch (error) {
        console.error('Failed to fetch events:', error);
        return res.status(500).json({ message: 'Failed to fetch events' });
    }
});

app.put('/api/events/:id', requireAuth, async (req, res) => {
    try {
        const { Eventimage, Title, Description } = req.body ?? {};
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }
        if (![Eventimage, Title, Description].every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updateEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                Eventimage: Eventimage.trim(),
                Title: Title.trim(),
                Description: Description.trim(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updateEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({
            message: 'Event updated',
            event: updateEvent,
        });
    }
    catch (error) {
        console.error('Failed to update event:', error);
        return res.status(500).json({ message: 'Failed to update event' });
    }
});


app.delete('/api/events/:id', requireAuth, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error('Failed to delete event:', error);
        return res.status(500).json({ message: 'Failed to delete event' });
    }
});


app.get('/api/event-count', async (req, res) => {
    try {
        const count = await Event.countDocuments();

        return res.status(200).json({
            totalEvents: count,
        });
    } catch (error) {
        console.error('Failed to count events:', error);
        return res.status(500).json({ message: 'Failed to count events' });
    }
});

async function startServer() {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is required');
    }
    if (process.env.MONGO_URI.includes('YOUR_DB_PASSWORD')) {
        throw new Error('Replace the MongoDB password placeholder in MONGO_URI');
    }
    if (
        !process.env.JWT_SECRET ||
        process.env.JWT_SECRET.length < 32 ||
        process.env.JWT_SECRET.startsWith('REPLACE_')
    ) {
        throw new Error('Set JWT_SECRET to a random value of at least 32 characters');
    }

    await mongoose.connect(process.env.MONGO_URI);
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error('Server startup failed:', error);
        process.exitCode = 1;
    });
}

module.exports = app;