import { usersActions } from "./usersActions";
import { postsActions } from "./postsActions";
import { commentsActions } from "./commentsActions";

const actions = {
  ...usersActions,
  ...postsActions,
  ...commentsActions,
};

export default actions;
