export interface AccumulatedAverages {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    loudness: number;
    speechiness: number;
    valence: number;
}

export const AccumulatedAveragesM = {
    empty: {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        loudness: 0,
        speechiness: 0,
        valence: 0,
    },
    combineAll: (arr: AccumulatedAverages[]) => {
        return arr.reduce((pv, cv) => AccumulatedAveragesM.combine(pv, cv), AccumulatedAveragesM.empty)
    },
    combine: (one: AccumulatedAverages, two: AccumulatedAverages) => {
        return {
            acousticness: one.acousticness + two.acousticness,
            danceability: one.danceability + two.danceability,
            energy: one.energy + two.energy,
            instrumentalness: one.instrumentalness + two.instrumentalness,
            loudness: one.loudness + two.loudness,
            speechiness: one.speechiness + two.speechiness,
            valence: one.valence + two.valence,
        }
    },
    average: (accumulatedValues: AccumulatedAverages, total: number) => {
        return {
            acousticness: accumulatedValues.acousticness / total,
            danceability: accumulatedValues.danceability / total,
            energy: accumulatedValues.energy / total,
            instrumentalness: accumulatedValues.instrumentalness / total,
            loudness: accumulatedValues.loudness / total,
            speechiness: accumulatedValues.speechiness / total,
            valence: accumulatedValues.valence / total,
        }
    }
}