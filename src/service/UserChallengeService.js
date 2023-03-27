import fetchRequest from "./FetchRequest";
import {BASE_URL} from "./config/ApiConfig";

export const getUserChallengesByUserId = async (id) => {
    return await fetchRequest.get(BASE_URL + "/api/profile/user-challenge/user/" + id)
        .then((response) => {
            console.log('getUserChallengesByUserId', response)
            return response.data
        });
};

export const getAllUsersByDurationId = async (data) => {
    console.log("getAllUsersByChallengeId", data.challengeId, data.durationId)

    return await fetchRequest
        .post(BASE_URL + "/api/admin/user-challenge/challenge/duration/registered-users/", {
            challengeId: data.challengeId,
            durationId: data.durationId
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log("ERROR reg ", error.response)
            // return error.response;
        })
};
export const getAllNotRegisteredUsersByDurationId = async (data) => {
    console.log("getAllNotRegisteredUsersByDurationId", data.challengeId, data.durationId)

    return await fetchRequest
        .post(BASE_URL + "/api/admin/user-challenge/challenge/duration/not-registered-users/", {
            challengeId: data.challengeId,
            durationId: data.durationId
        })
        .then((response) => {
            return response.data
        }).catch((error) => {
            console.log("ERROR notreg ", error.response)
            // return error.response;
        })
};

export const updateUserChallengeFromAdmin = async (userChallengeId, userId,  data) => {
    console.log("updateUserChallengeFromAdmin id", userChallengeId)
    console.log("updateUserChallengeFromAdmin userId", userId)
    console.log("updateUserChallengeFromAdmin", data)

    return await fetchRequest
        .put(BASE_URL + "/api/admin/user-challenge/challenge/duration/edit/", {
            userChallengeId : userChallengeId,
            userId : userId,
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            phone : data.phone,
            statusName : data.userChallengeStatus
        })
        .then((response) => {
            return response.data
        });
};

export const getAllForChallengeTable = async () => {
    return await fetchRequest.get(BASE_URL + "/api/admin/user-challenge/challenges")
        .then((response) => {
            return response.data
        });
};
export const getUserChallengeStatus = async () => {
    return await fetchRequest.get(BASE_URL + "/api/user-challenge/status")
        .then((response) => {
            return response.data
        });
};
export const getAllForChallengeDurationTable = async (challengeId) => {
    return await fetchRequest.get(BASE_URL + "/api/admin/user-challenge/challenge/" + challengeId + "/durations")
        .then((response) => {
            return response.data
        });
};


export const getAllChallengeDurationByChallengeId = async (id) => {
    return fetchRequest.get(BASE_URL + "/api/user/user-challenge/registration/durations/" + id)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response;
        });
};
export const registrationOnChallenge = async (userId, challengeId, selectedDate) => {
    return await fetchRequest
        .post(BASE_URL + "/api/user/user-challenge/registration", {
            userId: userId,
            challengeId: challengeId,
            startDate: selectedDate['startDate'],
            endDate: selectedDate['endDate']
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const registrationByUserIdDurationId = async (userId, challengeId, durationId) => {
    console.log('registrationOnChallengegbsgbsgbsgbw' + userId)
    console.log('registrationOnChallengegbsgbsgbsgbw' + durationId)
    return await fetchRequest
        .post(BASE_URL + "/api/admin/user-challenge/challenge/duration/registration", {
            userId: userId,
            challengeId: challengeId,
            durationId: durationId,
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteUserChallengesById = async (id) => {
    return await fetchRequest
        .delete(BASE_URL + "/api/user-challenge/" + id)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteUserChallengeByUserIdDurationId = async (userId, challengeId, durationId) => {
    console.log(`userIdForDelete: ${userId}`)
    return await fetchRequest
        .post(BASE_URL + "/api/admin/user-challenge/challenge/duration/delete", {
            userId: userId,
            challengeId: challengeId,
            durationId: durationId,
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};
export const deleteUserChallengeByUserIdChallengeId = async (userId, data) => {
    console.log(`userIdForDelete: ${userId}`)
    return await fetchRequest
        .post(BASE_URL + "/api/profile/user-challenge/user/delete", {
            userIdForDelete: userId,
            challengeIdForDelete: data.challengeId,
            startChallengeDate: data.startChallengeDate,
            endChallengeDate: data.endChallengeDate
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data;
        });
};
