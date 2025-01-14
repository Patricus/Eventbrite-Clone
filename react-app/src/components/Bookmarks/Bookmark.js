import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acquireEvents } from "../../store/events";
import { addOneBookmark, deleteBookmark, getAllBookmarks } from "../../store/bookmarks";

// const BookmarkEventName = styled.link`
//   cursor: pointer;
// `;

function Bookmark({ event_id, user_id = null }) {
    const dispatch = useDispatch();

    //if a button clicks and there is no bookmark in the bookmarks table where the user and the event matches,
    //we create a bookmark with those associations and display the button differently.

    //we need to create and delete bookmmarks on click
    //we query the state for all bookmarks where the user id matches, then look in the bookmarks to check if any of the bookmarks match both the user and event id's
    //if they do, we run the delete,
    //otherwise, we create the new bookmark

    const bookmarks = useSelector(state => state.bookmarks); //Grab bookmarks state
    const [bookmark, setBookmark] = useState(null); //Used to store the current event bookmark state

    useEffect(() => {
        //set bookmark to the first bookmark in state that matches the event_id
        setBookmark(
            Object.values(bookmarks).filter(bookmark => {
                return bookmark.event_id === parseInt(event_id);
            })[0]
        );
    }, [bookmarks, event_id]);

    useEffect(() => {
        dispatch(acquireEvents());
        dispatch(getAllBookmarks(user_id));
    }, [dispatch, user_id]);

    const clickButton = () => {
        //if bookmark is falsey create a bookmark
        if (!bookmark) dispatch(addOneBookmark({ event_id, user_id }));
        //else remove the bookmark
        else {
            dispatch(deleteBookmark(bookmark));
        }
    };

    return (
        <div>
            {user_id && !bookmark && (
                <>
                    <button
                        className="star-button"
                        onClick={clickButton}
                        style={{
                            fontSize: "30px",
                            padding: "2px 10px",
                            border: "2px solid white",
                            borderRadius: "50%",
                        }}>
                        {String.fromCharCode(9734)}
                    </button>
                </>
            )}
            {user_id && bookmark && (
                <button
                    className="star-button"
                    onClick={clickButton}
                    style={{
                        fontSize: "30px",
                        padding: "2px 10px",
                        border: "2px solid white",
                        borderRadius: "50%",
                    }}>
                    <div className="star">{String.fromCharCode(9733)}</div>
                </button>
            )}
        </div>
    );
}

export default Bookmark;
