import Post from '../models/Post.js';

class PostController {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate('user').exec();
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Could not get all posts',
        error,
      });
    }
  }

  async getOnePost(req, res) {
    try {
      const id = req.params.id;
      const post = Post.findOneAndUpdate(
        { _id: id },
        { $inc: { viewsCount: 1 } },
        { returnDocument: 'after' },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Could not get one post',
              err,
            });
          }
          if (!doc) {
            return res.status(404).json({ message: 'Post is not found' });
          }
          res.json(doc);
        },
      );
      res.json(post);
    } catch (error) {}
  }

  async createPost(req, res) {
    try {
      const doc = new Post({
        user: req.userID, // userID we got this from the authorized profile
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
      });

      const post = await doc.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Post could not be created',
        error,
      });
    }
  }

  async deletePost(req, res) {
    try {
      const id = req.params.id;
      Post.findOneAndDelete({ _id: id }, (err, doc) => {
        if (err) {
          console.log(error);
          res.status(500).json({
            message: 'Cannot delete the post',
            error,
          });
        }
        if (!doc) {
          console.log(error);
          res.status(500).json({
            message: 'Cannot fint the post',
            error,
          });
        }
        res.json({ success: true });
      });
    } catch (error) {}
  }

  async editPost(req, res) {
    try {
      const id = req.params.id;
      await Post.findByIdAndUpdate(
        { _id: id },
        {
          title: req.body.title,
          body: req.body.body,
          tags: req.body.tags,
          imageUrl: req.body.imageUrl,
          user: req.userID,
        },
      );
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Cannot update post',
        error,
      });
    }
  }
}

export default new PostController();
