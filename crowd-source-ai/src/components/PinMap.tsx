import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import React, { useState, useEffect } from 'react';

const position = { lat: 29.64833, lng: -82.34944 };
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type PinData = {
	lat: number;
	lng: number;
	text: string;
	showInfo: boolean;
};

function PinMap() {
	const [pins, setPins] = useState<PinData[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch('/api/posts');
				const posts = await res.json();

				const postPins: PinData[] = posts.map((post: any) => ({
					lat: post.latitude,
					lng: post.longitude,
					text: post.content || 'No content',
					showInfo: false
				}));

				setPins(postPins);
			} catch (error) {
				console.error("Error fetching post pins", error);
			}
		};

		fetchPosts();
	}, []);

	const toggleInfo = (index: number) => {
		setPins((prevPins) =>
			prevPins.map((pin, i) =>
				i === index ? { ...pin, showInfo: !pin.showInfo } : pin
			)
		);
	};

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<APIProvider apiKey={apiKey}>
				<Map
					center={position}
					zoom={12}
					mapId={'YOUR_MAP_ID'}
					style={{ height: '500px', width: '100%' }}
				>
					{pins.map((pin, index) => (
						<AdvancedMarker
							key={index}
							position={{ lat: pin.lat, lng: pin.lng }}
							onClick={() => toggleInfo(index)}
						>
							<Pin />
							{pin.showInfo && (
								<InfoWindow
									position={{ lat: pin.lat, lng: pin.lng }}
									onCloseClick={() => toggleInfo(index)}
								>
									<div style={{ color: 'black' }}>{pin.text}</div>
								</InfoWindow>
							)}
						</AdvancedMarker>
					))}
				</Map>
			</APIProvider>
		</div>
	);
}

export default PinMap;
