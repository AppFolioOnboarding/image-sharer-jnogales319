import { observable, action } from 'mobx';

export class FeedbackStore {
  @observable userName = '';
  @observable comments = '';
  @observable flashMessage;
  @observable flashSuccess;

  @action
  setName(userName) {
    this.userName = userName;
  }

  @action
  setComments(comments) {
    this.comments = comments;
  }

  @action
  setFlashMessage(flashMessage, isSuccess) {
    this.flashMessage = flashMessage;
    this.flashSuccess = isSuccess;
  }
}

export default new FeedbackStore();
