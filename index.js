import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import router from './router.js';

const PORT = 4444;
const MONGO_DB = `mongodb+srv://Bobahan:Qwe123applevika45@cluster0.ldrc72m.mongodb.net/blog?retryWrites=true&w=majority`;

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api/uploads', express.static('uploads'));

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: `/api/uploads/${req.file.originalname}` });
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_DB, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log('SERVER WORK ON:' + PORT));
  } catch (error) {
    console.log('DB ERROR: ' + error);
  }
})();
