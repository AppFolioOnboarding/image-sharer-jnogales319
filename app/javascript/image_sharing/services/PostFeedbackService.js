import { post } from "../utils/helper";

export class PostFeedbackService {
  feedbackUrl = '/api/feedbacks';

  postFeedback(userName, comments) {
    return post(this.feedbackUrl, {'userName': userName, 'comments': comments});
  }
}

export default new PostFeedbackService();
