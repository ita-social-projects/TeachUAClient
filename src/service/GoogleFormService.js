import fetchRequest from "./FetchRequest";
import { BASE_URL } from "./config/ApiConfig";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx/xlsx.mjs';

export const getAllRespondents = async () => {
  return await fetchRequest
    .get(BASE_URL + "/api/respondent")
    .then((response) => {
      return response.data;
    });
};


// form
export const saveFormToDB = async (data) => {
  return await fetchRequest
    .post(BASE_URL + "/api/form/save", {
      link: data.link,
      group: data.group,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const updateFormById = async (data) => {
  return await fetchRequest
    .put(BASE_URL + "/api/form/" + data.id, {
      description: data.description,
      title: data.title,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const updateFormGoogleById = async (data) => {
  return await fetchRequest
    .put(BASE_URL + "/api/form_upd/" + data.id)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getNonQuizListResponse = async () => {
  return await fetchRequest.get(BASE_URL + "/api/form").then((response) => {
    return response.data;
  });
};



export const getAllFormsResponse = async () => {
  return await fetchRequest
    .get(BASE_URL + "/api/form_all")
    .then((response) => {
      return response.data;
    });
};

export const deleteFormById = async (id) => {
  return await fetchRequest .delete(BASE_URL + "/api/form/" + id,).then((response) => {
      return response.data
  }).catch((error) => {
      return error.response.data
  });
};

export const exportQuizToExcel = async (id) => {
  return await fetchRequest
    .get(BASE_URL + "/api/downloadfile/"+id)
    .then((response) => {
      console.log(response.data);
      var blob = new Blob([response.data], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob);
      return response.data;
    }).catch((error) => {
        console.log(error);
        return error.response
    });
}


// result
export const getFilteredExcelResults = async (id, data) => {
  return await fetchRequest
    .post(BASE_URL + "/api/excel_result/" + id, {
      responseDateStart: data.dateStart,
      responseDateEnd: data.dateEnd,
      totalScore: data.score,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


export const getAllExcelResults = async (id) => {
  return await fetchRequest
    .get(BASE_URL + "/api/excel_result/" + id)
    .then((response) => {
      return response.data;
    });
};
export const getAllResults = async (id) => {
  return await fetchRequest
    .get(BASE_URL + "/api/result/" + id)
    .then((response) => {
      return response.data;
    });
};

export const saveAllResults = async (id) => {
  return await fetchRequest
    .post(BASE_URL + "/api/result/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getSimilarEmail = async (id, respondentEmail ) => {
  return await fetchRequest
    .get(BASE_URL + "/api/result/filtered_mail?id=" + id + "&email=" + respondentEmail,
   // .get(BASE_URL + "/api/result/filtered_mail?id=5&email=shevchukdiana1@gmail.cum",
    console.log(id),
    console.log(respondentEmail)
   
  )
    .then((response) => {
    console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


export const getSimilarDate = async (id, date ) => {
  return await fetchRequest
    .get(BASE_URL + "/api/result/filtered_date?id=" + id + "&date=" + date,
   // .get(BASE_URL + "/api/result/filtered_mail?id=5&email=shevchukdiana1@gmail.cum",
    console.log(id),
    console.log(date)
   
  )
    .then((response) => {
    console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const getSimilarScore = async (id, score ) => {
  return await fetchRequest
    .get(BASE_URL + "/api/result/filtered_score?id=" + id + "&score=" + score,
   // .get(BASE_URL + "/api/result/filtered_mail?id=5&email=shevchukdiana1@gmail.cum",
    console.log(id),
    console.log(score)
   
  )
    .then((response) => {
    console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const deleteResultById = async (id) => {
    return await fetchRequest .delete(BASE_URL + "/api/result/" + id,).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};

export const getArchivedResults = async () => {
  return await fetchRequest
    .get(BASE_URL + "/api/result_archived")
    .then((response) => {
      return response.data;
    });
};


export const restoreArchivedResults = async () => {
  return await fetchRequest
    .post(BASE_URL + "/api/result_archived")
    .then((response) => {
      return response.data;
    });
};


export const restoreArchivedResultById = async (id) => {
  return await fetchRequest
    .post(BASE_URL + "/api/result_archived/"+id)
    .then((response) => {
      return response.data;
    });
};



//question
export const getQuestionsByForm = async (id) => {
  return await fetchRequest
    .get(BASE_URL + "/api/formquestion/"+id)
    .then((response) => {
      return response.data;
    });
};

export const saveAllQuestions = async (id) => {
  return await fetchRequest
    .post(BASE_URL + "/api/formquestion/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


export const deleteQuestionById = async (id) => {
  return await fetchRequest .delete(BASE_URL + "/api/formquestion/" + id,).then((response) => {
      return response.data
  }).catch((error) => {
      return error.response.data
  });
};


export const restoreArchivedQuestions = async () => {
  return await fetchRequest
    .post(BASE_URL + "/api/formquestion/restore")
    .then((response) => {
      return response.data;
    });
};


export const updateQuestionById = async (data) => {
  return await fetchRequest
    .put(BASE_URL + "/api/formquestion/" + data.id, {
      title: data.title,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


//option
export const getOptionsByQuestion = async (id) => {
  return await fetchRequest
    .get(BASE_URL + "/api/formoption/"+id)
    .then((response) => {
      console.log(response)
      return response.data;
    });
};


export const saveAllOptions = async (id) => {
  return await fetchRequest
    .post(BASE_URL + "/api/formoption/que/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


export const deleteOptionById = async (id) => {
  return await fetchRequest .delete(BASE_URL + "/api/formoption/" + id,).then((response) => {
      return response.data
  }).catch((error) => {
      return error.response.data
  });
};
