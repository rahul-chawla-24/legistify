const URL = "https://lazy-gold-ladybug-tam.cyclic.app/";

function fetchedLawyers(lawyers) {
  return { type: "FETCHED_LAWYERS", lawyers: lawyers };
}

function loading() {
  return { type: "LOADING" };
}

function fetchingLawyers() {
  return (dispatch) => {
    dispatch(loading());
    fetch(`${URL}lawyers`)
      .then((res) => res.json())
      .then((lawyers) => {
        dispatch(fetchedLawyers(lawyers));
      });
  };
}

function userCreated(user) {
  return { type: "USER_CREATED", user: user };
}

function createUser(body) {
  return (dispatch) => {
    dispatch(loading());
    fetch(`${URL}users`)
      .then((res) => res.json())
      .then((users) => {
        dispatch(fetchedLawyers(users));
        let alreadyUser = users?.find((user) => user?.email === body?.email);
        if (alreadyUser) {
          dispatch(userCreated(alreadyUser));
        } else {
          fetch(`${URL}users`, {
            method: "POST",
            body: JSON.stringify({ ...body }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            .then((user) => {
              dispatch(userCreated(user));
            });
        }
      });
  };
}

function slotBooked(slot) {
  return { type: "SLOT_CREATED", slot: slot };
}

function bookAndUpdateSlot(body, id) {
  return (dispatch) => {
    dispatch(loading());
    fetch(`${URL}lawyers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...body }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(fetchingLawyers());
        dispatch(slotBooked(true));
      });
  };
}

export { fetchingLawyers, createUser, bookAndUpdateSlot, slotBooked };
