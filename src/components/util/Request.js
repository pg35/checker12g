import { useEffect } from "react";
import Progress from "../ui/Progress";
import { useAjax } from "../../util/hooks";
import * as T from "../../reducer/action";

export default function Request(props) {
  const {
    state: {
      scan: { failed }
    },
    dispatch,
    onComplete,
    onFail = () =>
      props.dispatch(
        T.createAction(T.SCAN, {
          failed: true
        })
      ),
    onRetry = () =>
      props.dispatch(
        T.createAction(T.SCAN, {
          failed: false
        })
      ),
    messages,
    repeatCount
  } = props;
  const [{ data, fail }, ajaxFuncs, counter, sleep, isStopped] = useAjax({
    ...props.useAjaxArgs,
    autoStart: !failed,
    failOnError: false
  });

  useEffect(() => {
    console.log("use effect request", data, fail, repeatCount);

    if (data && data.success) {
      if (data.data.done) {
        if (2 === data.data.done) onComplete(data.data);
        if (3 === data.data.done) !failed && onFail();
        ajaxFuncs.stop();
      }
    }
    if (
      (data && !data.success) ||
      null !== fail ||
      (repeatCount && counter >= repeatCount)
    ) {
      !failed && onFail();
      ajaxFuncs.stop();
    }
  }, [data, fail, counter]);
  console.log("request", counter, sleep, repeatCount, data, fail);
  let progress = 1;
  let detail = "";
  if (data) {
    if (data.success) {
      if (2 === data.data.done) {
        progress = 2;
      } else if (3 === data.data.done) {
        progress = 3;
        detail = data.data.error;
      }
    } else {
      progress = 3;
      detail = data.data.message;
    }
  } else if (null !== fail) {
    progress = 3;
    detail = fail;
  }
  if (repeatCount && counter >= repeatCount) {
    progress = 4;
  }
  const msg = (
    <span>
      {props.messages[progress - 1]}
      {detail && (
        <span>
          <br />
          <small>{detail}</small>
        </span>
      )}
    </span>
  );
  return (
    <div>
      <Progress
        status={progress > 3 ? 3 : progress}
        message={msg}
        classes={["stacked", "center", "large"]}
      />
      {progress > 2 && (
        <div className="pxq_pgck_btn_retry">
          <button
            onClick={() => {
              ajaxFuncs.start();
              failed && onRetry();
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
