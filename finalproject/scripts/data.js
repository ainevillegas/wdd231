export async function fetchActivities() {
    try {

        const response =
            await fetch("data/activities.json");


        if (!response.ok) {
            throw new Error(
                `Data request failed with status ${response.status}`
            );
        }


        const data =
            await response.json();


        return data;

    } catch (error) {

        console.error(
            "Unable to load activity data:",
            error
        );


        throw error;
    }
}