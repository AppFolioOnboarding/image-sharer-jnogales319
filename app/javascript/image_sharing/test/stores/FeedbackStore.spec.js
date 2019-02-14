import assert from 'assert';
import { FeedbackStore } from '../../stores/FeedbackStore';

describe('<FeedbackStore />', () => {
  let feedbackStore;

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
  })

  it('has an empty default userName', () => {
    assert.strictEqual(feedbackStore.userName, '');
  });

  it('should set name properly', () => {
    const testName = 'Mr. Username';

    feedbackStore.setName(testName);

    assert.strictEqual(feedbackStore.userName, testName);
  });

  it('has empty default comments', () => {
    assert.strictEqual(feedbackStore.comments, '');
  });

  it('should set comments properly', () => {
    const testComment = 'Mr. Comment';

    feedbackStore.setComments(testComment);

    assert.strictEqual(feedbackStore.comments, testComment);
  });

  it('should set flashMessage properly', () => {
    const testMessage = 'This is a flash message!';

    feedbackStore.setFlashMessage(testMessage);

    assert.strictEqual(feedbackStore.flashMessage, testMessage);
  });
});
