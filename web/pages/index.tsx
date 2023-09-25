import Page from '@/components/Page';
import Api from '@/lib/api';

export default function Home() {
  if (!Api.getSession()) {
    location.href = '/login';
  } 

  return (
    <Page>
      <a href="/">adasd</a>
    </Page>
  );
}
