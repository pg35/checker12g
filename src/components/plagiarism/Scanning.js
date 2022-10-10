import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Scanning(props) {
  const { state, dispatch, repeatCount = 100 } = props;
  const { scan } = state;
  return (
    <Request
      {...props}
      useAjaxArgs={{
        ajax: {
          data: {
            action: "pxq_pgck_get_scan_result",
            scan_id: scan.id
          }
        },
        repeatCount: repeatCount
      }}
      repeatCount={repeatCount}
      onComplete={(data) => {
        dispatch(
          T.createAction(T.SCAN, {
            status: "exporting"
          })
        );
        dispatch(
          T.createAction(T.APP, {
            balance: data.balance - data.credits
          })
        );
      }}
      messages={[
        "Checking plagiarism",
        "Plagiarism check completed",
        "Plagiarism check stopped",
        "Plagiarism check timed out"
      ]}
    />
  );
}
