import PostModel, { IPost } from '../models/PostModel';
import { ILike } from '../models/LikeModel';
class PostRepository {
  private static _instance: PostRepository = new PostRepository();

  private constructor() {
    PostRepository._instance = this;
  }

  public static getInstance() {
    return PostRepository._instance;
  }

  async allPost(filter: object): Promise<IPost[]> {
    return await PostModel.find(filter);
  }

  async findPost(postId: String): Promise<IPost | null> {
    return await PostModel.findById(postId);
  }

  async createPost(post: IPost | any): Promise<IPost> {
    return await PostModel.create(post);
  }

  async updatePost(id: String, post: IPost | any): Promise<IPost | null> {
    await PostModel.updateOne({ _id: id }, post);

    return await PostModel.findById(id);
  }

  async deletePost(postId: String): Promise<boolean> {
    const result = await PostModel.deleteOne({ _id: postId });

    return !!result.n && result.n > 0;
  }

  async createLike(postId: String, like: ILike): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: like } }
    );
  }

  async deleteLike(postId: String, userId: String): Promise<IPost> {
    return await PostModel.updateOne(
      { _id: postId },
      { $pull: { likes: { userId: userId } } }
    );
  }
}

export default PostRepository;
