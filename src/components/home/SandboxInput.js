import * as T from "../../reducer/action";
export default function SandboxInput(props) {
  const {
    state: {
      app: { sandbox }
    },
    dispatch
  } = props;
  //if (!window.pxq_pgck_is_admin) return null;
  return (
    <div className="pxq_pgck_row">
      <label>
        <input
          type="checkbox"
          checked={sandbox}
          onChange={() =>
            dispatch(
              T.createAction(T.APP, {
                sandbox: !sandbox
              })
            )
          }
        />{" "}
        Enable sandbox mode
      </label>
    </div>
  );
}
