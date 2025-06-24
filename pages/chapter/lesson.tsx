import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';

interface LessonData {
  id: string;
  slug: string;
  title: string;
  description: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  // ... other properties
}

export default function LessonPage({ lessonData }: { lessonData: LessonData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{lessonData.seo.metaTitle}</title>
        <meta name="description" content={lessonData.seo.metaDescription} />
        <meta name="keywords" content={lessonData.seo.keywords.join(', ')} />
      </Head>
      {/* Your lesson content components here */}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDirectory = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDirectory).filter(file => file.endsWith('.json'));
  
  const paths = files.map(file => {
    const lessonData = JSON.parse(
      fs.readFileSync(path.join(dataDirectory, file), 'utf8')
    );
    const [chapter, lesson] = lessonData.slug.split('/');
    return {
      params: { chapter, lesson }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { chapter, lesson } = params;
  const dataDirectory = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDirectory).filter(file => file.endsWith('.json'));
  
  const lessonFile = files.find(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDirectory, file), 'utf8'));
    return data.slug === `${chapter}/${lesson}`;
  });

  if (!lessonFile) {
    return {
      notFound: true
    };
  }

  const lessonData = JSON.parse(
    fs.readFileSync(path.join(dataDirectory, lessonFile), 'utf8')
  );

  return {
    props: {
      lessonData
    }
  };
};
