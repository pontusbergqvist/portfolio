import Breadcrumbs from '../../components/shared/breadcrumbs';
import Heading from '../../components/shared/heading';
import Layout from '../../components/layout';
import Button from '../../components/shared/button';
import Contentful from '../../api/contentful';
import AnimateQueryPage from '../../components/shared/animatequerypage';
import ExternalLink from '../../components/work/externallink';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Project } from '../../models/work';
import { AiFillGithub } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AdjacentPostData } from '../../models/blog';
import { useState } from 'react';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  project: Project;
  nextProject: AdjacentPostData | null;
  previousProject: AdjacentPostData | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentful = new Contentful();
  const paths = await contentful.getAllProjectPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const contentful = new Contentful();
  const project = await contentful.getProject(params!.slug);
  const nextProject = await contentful.getNextProject(project);
  const previousProject = await contentful.getPreviousProject(project);

  return {
    props: {
      project,
      nextProject,
      previousProject,
    },
    revalidate: 10,
  };
};

const Project = ({ project, nextProject, previousProject }: Props) => {
  const [dir, setDir] = useState<string>();
  const { title, image, body, externalLink, github } = project;

  return (
    <AnimateQueryPage id={project.slug} title={title} direction={dir}>
      <Layout>
        <Heading>{title}</Heading>
        <div className="mt-4 w-full shadow-lg h-[250px] object-cover rounded mb-3 relative overflow-hidden">
          <Image
            src={`https:${image.fields.file.url}`}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Breadcrumbs current={title} />
        <div className="markdown my-5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
        <div className="flex -ml-1">
          {github && <ExternalLink to={github} icon={<AiFillGithub />} />}
          {externalLink && (
            <ExternalLink to={externalLink} icon={<BiLinkExternal />} />
          )}
        </div>
        <div className="w-full flex justify-between my-16">
          <Button
            setDir={setDir}
            type="previous"
            route="/work"
            data={previousProject}
          >
            No previous project
          </Button>
          <Button setDir={setDir} type="next" route="/work" data={nextProject}>
            No next project
          </Button>
        </div>
      </Layout>
    </AnimateQueryPage>
  );
};

export default Project;
