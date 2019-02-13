import assert from 'assert';
import * as helper from "../../utils/helper";
import postFeedbackService from '../../services/PostFeedbackService';
import sinon from 'sinon';

describe('<PostFeedbackService />', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should post feedback properly', async () => {
    const expectedResponse = "Expected output";
    const dummyPromise = Promise.resolve(expectedResponse);

    const postFeedbackStub = sandbox.stub(helper, "post").returns(dummyPromise);
    const testUsername = "test";
    const testComments = "hello!";
    const response = await postFeedbackService.postFeedback(testUsername, testComments);

    const expectedCallParams = { 'userName': testUsername, 'comments': testComments };
    assert(postFeedbackStub.calledOnceWith(postFeedbackService.feedbackUrl, expectedCallParams));
    assert.strictEqual(response, expectedResponse);
  });
});
