import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Checking(props) {
  const { state, dispatch, repeatCount = 3 } = props;
  const { scan } = state;
  return (
    <Request
      {...props}
      useAjaxArgs={{
        ajax: {
          data: {
            action: "pxq_pgck_get_check_credits_result",
            scan_id: scan.id
          }
        },
        repeatCount: repeatCount
      }}
      repeatCount={repeatCount}
      onComplete={(data) => {
        dispatch(
          T.createAction(T.SCAN, {
            status: "checked",
            cost: data.credits
          })
        );
        dispatch(
          T.createAction(T.APP, {
            balance: data.balance
          })
        );
      }}
      messages={[
        "Calculating cost",
        "Cost calculated",
        "Cost calculation stopped",
        "Cost calculation timed out"
      ]}
    />
  );
}
