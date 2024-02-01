import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setSity] = useState('');
	const [temp, setTemp] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=63ac888f7350a777d95b6655eec07af3&lang=ru',
		)
			.then((data) => data.json())
			.then(({ name, main, weather }) => {
				setSity(name);
				setTemp(Math.round(main.temp - 273.15));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				Блог веб-разработчика
				<br />
				Zulpikarov.Z@gmail.com
			</div>
			<div>
				<div>
					{city},&nbsp;
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temp}°C, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	// position: fixed;
	// bottom: 0;
	// background-color: #fff;
	width: 1000px;
	height: 120px;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 40px;
	box-shadow: 0 2px 17px #000;
`;
