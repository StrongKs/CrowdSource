import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from 'react';

const position = { lat: 29.64833, lng: -82.34944 };
const apiKey = 'AIzaSyBpvLE8vWiJOforCLPk70gOCIRi-tnVIaw';

interface Post {
    id: string;
    author_name: string;
    content?: string;
    image?: string;
    createdAt: string;
  }

function PinMap() {
      const [posts, setPosts] = useState<Post[]>([]);
      const [isLoading, setIsLoading] = useState(true);
    
      const fetchPosts = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('/api/posts');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
    
	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<APIProvider apiKey={apiKey}>
				<Map
					center={position}
					zoom={15}
					mapId={'YOUR_MAP_ID'} // Optional, but useful for styling
					style={{ height: '500px', width: '100%' }}
				>
					<AdvancedMarker position={position}>
						<Pin />
					</AdvancedMarker>
				</Map>
			</APIProvider>
		</div>
	);
}

export default PinMap;
