import { useState, useEffect, useRef } from 'react';

/**
 * Checks if element is being hovered
*/
const useHover = () => {
	const [isHovering, setIsHovering] = useState(false);
	const ref: any = useRef(null);

	const onMouseOver = () => setIsHovering(true);
	const onMouseOut = () => setIsHovering(false);

	useEffect(() => {
		ref.current && ref.current.addEventListener("mouseover", onMouseOver);
		ref.current && ref.current.addEventListener("mouseout", onMouseOut);

		return () => {
			ref.current.removeEventListener("mouseover", onMouseOver);
			ref.current.removeEventListener("mouseout", onMouseOut);
		}
	}, [ref.current])

	return [ref, isHovering];
}

export default useHover;