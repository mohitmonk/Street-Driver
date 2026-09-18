let loaderPromise: Promise<void> | null = null;
export function loadGoogleMaps(apiKey: string): Promise<void> {
  if (!apiKey) return Promise.reject(new Error('Missing VITE_GOOGLE_MAPS_API_KEY'));
  if (window.google?.maps) return Promise.resolve();
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve,reject)=>{
    const script=document.createElement('script'); script.dataset.streetDriverGoogleMaps='true'; script.async=true;
    script.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(apiKey)+'&v=weekly&loading=async';
    script.onload=()=>resolve(); script.onerror=()=>reject(new Error('Google Maps failed to load. Check your API key and enabled APIs.'));
    document.head.appendChild(script);
  }); return loaderPromise;
}
