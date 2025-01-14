import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllTickets } from "../../store/tickets";
import { Modal } from "../Global/Elements/Modal";
import { getAllBookmarks } from "../../store/bookmarks";
import EditUserForm from "../auth/EditUserForm";
import DeleteUserModal from "../auth/DeleteUser";
import BookmarksPanel from "./BookmarkPanel";
import UserPanel from "./UserPanel";
import TicketPanel from "./TicketPanel";
import MyEventsPanel from "./MyEventsPanel";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const ticketsState = useSelector((state) => state.tickets);
  const tickets = Object.values(ticketsState);
  const bookmarksState = useSelector((state) => state.bookmarks);
  const bookmarks = Object.values(bookmarksState);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    dispatch(getAllTickets(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;
    dispatch(getAllBookmarks(user.id));
  }, [dispatch, user]);

  const updateUserModal = async () => {
    setShowUpdateUserModal(true);
  };

  const deleteUserModal = async () => {
    setShowConfirmDeleteModal(true);
  };

  if (!user) return <Redirect to={"/"} />;
  if (user) {
    return (
      <main id="dashboard">
        {showUpdateUserModal && (
          <Modal onClose={() => setShowUpdateUserModal(false)}>
            <EditUserForm setShowUpdateUserModal={setShowUpdateUserModal} />
          </Modal>
        )}
        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeleteUserModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
            />
          </Modal>
        )}
        {bookmarksState && <BookmarksPanel bookmarks={bookmarks} />}
        <UserPanel user={user} tickets={tickets} />
        <div
          style={{
            marginLeft: "25px",
          }}
        >
          <TicketPanel tickets={tickets} />
        </div>
        <MyEventsPanel />
        <div
          className="dashboard-buttons"
          style={{
            marginLeft: "25px",
          }}
        >
          <button
            onClick={updateUserModal}
            className="image-upload-label"
            style={{
              justifyContent: "center",
              width: "230px",
            }}
          >
            Update User Account
          </button>
          <button
            onClick={deleteUserModal}
            className="image-upload-label"
            style={{
              marginTop: "10px",
              justifyContent: "center",
              width: "230px",
            }}
          >
            Delete User Account
          </button>
        </div>
      </main>
    );
  }
}

export default Dashboard;
