import { observable, action } from 'mobx';

export class FeedbackStore {
  @observable userName = '';
  @observable comments = '';

  @action
  setName(userName) {
    this.userName = userName;
  }

  @action
  setComments(comments) {
    this.comments = comments;
  }
}

export default new FeedbackStore();
