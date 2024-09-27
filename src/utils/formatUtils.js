import { EST_SECONDS_PER_QUERY } from "../constants/queries";

export function estimateQueryTime(queryCount) {
    const SECONDS_PER_QUERY = EST_SECONDS_PER_QUERY || 10;
    const seconds = queryCount * SECONDS_PER_QUERY;
    const minutes = Math.round((seconds / 60) * 10)/10;
    const remaining_seconds = seconds % 60;
    
    if (minutes >= 1) {
        return `${minutes} Minutes`;
    } else {
        return `${Math.round(seconds * 10) / 10} seconds`;
    }
}


export function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      return true;
    } catch (err){
      console.log(err);
      return false;
    }
}