import Layout from '../components/layout/AuthLayout';

/**
 * Komponenta představující stránku info hodnotami o uživatelích
 * [pouze přihlášený uživatel]
 */
export default function OverviewScreen() {
  /* 
    TODO: vytvořte přehled o uživatelích
      - inspirace v těch barevných kartách (https://www.learncube.com/images/crmdash.png)
      - na přehledu by měl být celkový počet uživatelů
      - přehled rolí a jejich rolí

  */
  return (
    <Layout>
      <div className='flex flex-col container mx-auto'>
        <h1>Overview</h1>
      </div>
    </Layout>
  );
}
