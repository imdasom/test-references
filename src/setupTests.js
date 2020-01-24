// this is basically: afterEach(cleanup)
// automatically unmount and cleanup DOM after the test is finished.
import '@testing-library/react/cleanup-after-each';
// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';
