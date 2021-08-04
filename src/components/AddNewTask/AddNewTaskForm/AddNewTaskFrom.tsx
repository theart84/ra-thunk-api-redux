// Core
import React from "react";
import {useDispatch, useSelector} from "react-redux";

// Actions
import {changeValue, clearForm} from '../../../bus/form/reducer';
import {addNewTask, editTask, clearCurrentTaskId} from '../../../bus/tasks/reducer';

// Types
import {RootState} from "../../../store";

const AddNewTaskFrom: React.FC = () => {
  const {text, price} = useSelector((store: RootState) => store.form);
  const id = useSelector((store: RootState) => store.tasks.currentEditTaskId);
  const dispatch = useDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    dispatch(changeValue({type: name, value}));
  }

  const onResetHandler = () => {
    dispatch(clearForm());
    dispatch(clearCurrentTaskId());
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim().length || !price.trim().length) {
      return;
    }
    const convertPriceFromStrToNum = Number(price);
    if (isNaN(convertPriceFromStrToNum)) {
      return;
    }
    if (id) {
      const payload = {
        id,
        text,
        price: convertPriceFromStrToNum
      }
      dispatch(editTask(payload));
      dispatch(clearCurrentTaskId())
    } else {
      dispatch(addNewTask({text, price: convertPriceFromStrToNum}));
    }
    dispatch(clearForm());
  }

  return (
    <div className="card mb-5">
      <div className="card-body">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">Название операции</label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              name="text"
              value={text}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Стоимость</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{marginRight: 15}}>Save</button>
          <button type="reset" className="btn btn-danger" onClick={onResetHandler}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewTaskFrom;