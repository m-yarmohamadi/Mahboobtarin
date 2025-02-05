import { useEffect, useRef, useState } from 'react';
import TitleItems from '../TitleItems';
import ViewMore from '../ViewMore';
import isRichText from '@/utils/isRichText';

export default function About({ description }) {
	const [showCompleteBio, setShowCompleteBio] = useState(false);
	const [isClamped, setIsClamped] = useState(false);
	const textRef = useRef(null);

	useEffect(() => {
		if (description) {
			const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);
			const maxHeight = lineHeight * 5;

			if (textRef.current.scrollHeight > maxHeight) {
				setIsClamped(true);
			} else {
				setIsClamped(false);
			}
		}
	}, [description]);

	if (description) {
		return (
			<div id="bio" className="pt-16">
				<TitleItems title={'بیوگرافی'} />
				{isRichText(description) ? (
					<div
						ref={textRef}
						dangerouslySetInnerHTML={{ __html: description }}
						className={`${
							!showCompleteBio && 'line-clamp-5 '
						}   leading-6 font-thin text-slate-800 text-justify whitespace-pre-wrap`}
					></div>
				) : (
					<p
						ref={textRef}
						className={`${
							!showCompleteBio && 'line-clamp-5 '
						} text-xs  leading-6 font-medium text-slate-800 text-justify whitespace-pre-wrap`}
					>
						{!isRichText(description) && description}
					</p>
				)}

				{isClamped && (
					<ViewMore
						complete={showCompleteBio}
						onClick={() => setShowCompleteBio(!showCompleteBio)}
					/>
				)}
			</div>
		);
	}
}
