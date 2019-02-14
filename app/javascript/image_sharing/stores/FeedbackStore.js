import { observable, action } from 'mobx';

export class FeedbackStore {
  @observable userName = '';
  @observable comments = '';
  @observable flashMessage;

  @action
  setName(userName) {
    this.userName = userName;
  }

  @action
  setComments(comments) {
    this.comments = comments;
  }

  @action
  setFlashMessage(flashMessage) {
    this.flashMessage = flashMessage;
  }
}

export default new FeedbackStore();
