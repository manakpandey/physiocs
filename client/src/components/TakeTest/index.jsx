import React from 'react';
import Posenet from 'react-posenet';
import { useParams } from 'react-router';

import "./index.scss"

export const TakeTest = () => {
	const { tid } = useParams();

	return (
		<div className={"tp-take_test"}>
			<div className={"left"}>
				{tid}
			</div>
			<div className={"right"}>
				<Posenet />
			</div>
		</div>

	)
}