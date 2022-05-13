import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '../../models/work';

const variants = {
	hover: {
		scale: 1.1,
		transition: {
			duration: .4			
	 	}
	}
}

interface Props {
	project: Project
}

const Card = ({ project }: Props) => {
	const { title, image, description, slug } = project;

	return (
		<Link href={`/work/${slug}`} passHref scroll={false}>
			<motion.article whileHover="hover" className="cursor-pointer h-full w-full overflow-hidden">
				<div className="overflow-hidden max-w-[290px] h-[150px] rounded mx-auto">
					<motion.img 
						variants={variants} 
						className="align-middle h-full w-full object-cover mb-2" 
						src={image.fields.file.url} alt={title} />
				</div>
				<div className="max-w-[290px] blog:max-w-full mx-auto my-2">
					<h3 className='text-h3'>{title}</h3>
					<p className='my-1 text-sm'>{description}</p>
				</div>
			</motion.article>
		</Link>
	)
}

export default Card;
