import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Scan(props) {
  const { state, dispatch } = props;
  const { scan } = state;
  return (
    <Request
      {...props}
      useAjaxArgs={{
        ajax: {
          method: "GET",
          data: {
            action: "pxq_pgck_get_export_result",
            scan_id: scan.id
          }
        }
      }}
      onComplete={(data) => {
        dispatch(
          T.createAction(T.SCAN, {
            status: "exporting"
          })
        );
        dispatch(
          T.createAction(T.APP, {
            balance: state.app.balance
          })
        );
      }}
      messages={[
        "Requesting report and PDF generation",
        "Report and PDF generation request submitted",
        "Report and PDF generation request failed"
      ]}
    />
  );
}
