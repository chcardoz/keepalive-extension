import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { errorStringStorage, sectionIdStorage } from '@chrome-extension-boilerplate/storage';
import { ErrorMessage, LoadingMessage, SuccessMessage } from './LogMessage';
import { QuestionAnswer, ShowAnswer } from './QuestionAnswer';

const SidePanel = () => {
  const section = useStorageSuspense(sectionIdStorage);
  const errorMessage = useStorageSuspense(errorStringStorage);

  if (section === 'loading') {
    return <LoadingMessage />;
  }

  if (section === 'success') {
    return <SuccessMessage message="Your message has been sent successfully!" />;
  }

  if (section === 'error') {
    return <ErrorMessage message={errorMessage} />;
  }

  if (section === 'question-answer') {
    return <QuestionAnswer />;
  }

  if (section === 'correct-answer') {
    return <ShowAnswer />;
  }

  return <LoadingMessage />;
};

export default withErrorBoundary(
  withSuspense(SidePanel, <div> Loading ... </div>),
  <ErrorMessage message="Error Occur" />,
);
