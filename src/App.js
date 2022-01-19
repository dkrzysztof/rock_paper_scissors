import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import ComputerFigure, { getFigureFromResults } from './ComputerFigure';
import Figure from './Figure';
import JsonRockPaperScissors from './JsonRockPaperScissors';
import { Row, Col, Button } from 'antd';
import './App.css';
import * as tf from '@tensorflow/tfjs';

function App() {
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);
	const [model, setModel] = React.useState(null);
	const [figures, setFigure] = React.useState(null);

	useEffect(async () => {
		tf.ready().then(async () => {
			const modelTF = await tf.loadLayersModel('http://localhost:80/model.json');
			setModel(modelTF);
			console.log('Model loaded successfully!');
		});
	}, []);

	// const capture = React.useCallback(() => {
	const capture = () => {
		if (imgSrc) {
			setImgSrc(null);
		} else {
			const imageSrc = webcamRef.current.getScreenshot();
			setImgSrc(imageSrc);
			let example = tf.browser.fromPixels(webcamRef.current.video);
			example = example.reshape([1, 224, 224, 3]);
			let img = tf.image.resizeBilinear(example, [224, 224]).div(tf.scalar(255));
			img = tf.cast(img, 'float32');
			if (model) {
				const figures = model.predict(img).dataSync();
				setFigure(figures);
			}
		}
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<p>Projekt MGU - gra w papier, kamień i nożyce.</p>
			</header>
			<Row className='game-container' justify='space-around'>
				<Col flex='350px' className='webcam-container'>
					{imgSrc ? (
						<div className='hoverable'>
							<img className='parent-hover img' width={350} height={350} src={imgSrc} />
							<div className='parent-cover'>
								<Figure type={getFigureFromResults(figures)} />
							</div>
						</div>
					) : (
						<Webcam
							mirrored
							minScreenshotHeight={224}
							minScreenshotWidth={224}
							width={350}
							audio={false}
							ref={webcamRef}
							screenshotFormat='image/jpeg'
							forceScreenshotSourceSize
							videoConstraints={{
								aspectRatio: 1,
								width: 224
							}}
						/>
					)}
				</Col>
				<Col flex='350px' className='computer-response-container'>
					<div className='relative'>{imgSrc && <ComputerFigure results={figures} />}</div>
				</Col>
			</Row>
			<div className='button-container'>
				<Button type='primary' size='large' onClick={capture}>
					{imgSrc ? 'Next round' : 'Capture'}
				</Button>
			</div>
			<div className='detailed-response-container'>{figures && <JsonRockPaperScissors results={figures} />}</div>
		</div>
	);
}

export default App;
