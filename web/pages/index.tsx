import Page from '@/components/Page';
import Api from '@/lib/api';

export default function Home() {
  if (!Api.getSession()) {
    window.location.href = '/login';
  } else {
    window.location.href = '/totems';
  }

  return (
    <Page>
      <a href="/">#TODO</a>
    </Page>
  );
}
