import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap'
import './Rating.css'
import { FaStar } from 'react-icons/fa'
import { useFormik } from 'formik';
import * as Yup from "yup";
import RatingModel from '../../models/RatingModel';
import { Spinner } from 'react-bootstrap';
import {
    successNofication,
    errorNofication
} from './../../common/nofications/nofication'

const Rating = () => {

    const [modal, setModal] = useState(null)
    const exampleModal = useRef()
    const [rating, setRating] = useState(null)
    const [ratingChange, setRatingChange] = useState(null)
    const [modalBtn, setModalBtn] = useState(false)
    const [comments, setComments] = useState([
        {
            name: "Phạm Quang Huy",
            comment: "Sản phẩm nhìn cũng vui",
            star: 4,
            phone: "0933691822",
            email: "toilahuy@gmail.com"
        },
        {
            name: "Phạm Xuan Hoai",
            comment: "Tui cũng thấy vậy",
            star: 3,
            phone: "0933691822",
            email: "hoaixp@gmail.com"
        }
    ])

    const average = (comments.reduce((total, curr) => total + curr.star, 0) / comments.length).toFixed(1);

    const compPercent = (value) => {
        var percent = 0;
        var count = 0;
        for (let i = 0; i < comments.length; i++) {
            if (value === comments[i].star) {
                count++
            }
        }
        percent = (count / comments.length) * 100;
        return percent;
    }

    useEffect(() => {
        setModal(
            new Modal(exampleModal.current)
        )
    }, [])

    const formik = useFormik({
        initialValues: RatingModel,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Nhập ít nhất 2 chữ")
                .max(15, "Nhập tối đa 15 chữ")
                .required("Bắt buộc!"),
            comment: Yup.string()
                .min(15, "Nhập ít nhất 15 chữ")
                .max(40, "Nhập tối đa 40 chữ")
                .required("Bắt buộc!"),
            email: Yup.string()
                .required("Bắt buộc!"),
            phone: Yup.string()
                .required("Bắt buộc!"),
        }),
        onSubmit: (values) => {
            setTimeout(() => {
                setComments([...comments, values]);
                modal.hide();
                setModalBtn(true)
                successNofication("Đánh giá thành công")
            }, 2000);
        }
    });

    return (
        <div className="container mt-3 col-md-10">
            <h4>Đánh giá</h4>
            <div className="d-flex">
                <div className="text-center average">
                    <span className="display-4 font-weight-bolder">{average}</span><br></br>
                    <span className="text-black-50">trên tổng 5</span>
                </div>
                <div className="flex-grow-1">
                    <div className="row align-items-center">
                        <div className="col-4 text-right">
                            5
                        </div>
                        <div className="col-8">
                            <div className="progress" style={{ height: 2 + 'px' }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: compPercent(5) + '%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-4 text-right">
                            4
                        </div>
                        <div className="col-8">
                            <div className="progress" style={{ height: 2 + 'px' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: compPercent(4) + '%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-4 text-right">
                            3
                        </div>
                        <div className="col-8">
                            <div className="progress" style={{ height: 2 + 'px' }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: compPercent(3) + '%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-4 text-right">
                            2
                        </div>
                        <div className="col-8">
                            <div className="progress" style={{ height: 2 + 'px' }}>
                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: compPercent(2) + '%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-4 text-right">
                            1
                        </div>
                        <div className="col-8">
                            <div className="progress" style={{ height: 2 + 'px' }}>
                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: compPercent(1) + '%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-10">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Bình luận( {comments.length} )</h5>
                    </div>

                    {/* Start Comment */}
                    {
                        comments.map((comment, index) => (
                            <div className="card p-3" key={index}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="user d-flex flex-row align-items-center">
                                        <img src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" width="60" className="user-img rounded-circle" alt="" />
                                        <span>
                                            <small className="font-weight-bold text-primary"> {comment.name} </small>
                                            <p className="font-weight-bold">{comment.comment}</p>
                                        </span>
                                    </div>
                                    <small>2 ngày trước</small>
                                </div>
                                <div className="action d-flex justify-content-between mt-2 align-items-center">
                                    <div className="icons align-items-center">
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-check-circle-o check-icon"></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {/* End Comment */}

                    {/* Start Add Comment*/}
                    <button type="button"
                        className="btn btn-primary mt-2 mb-4"
                        data-toggle="modal"
                        onClick={() => {
                            if (!modalBtn) {
                                modal.show()
                            } else {
                                errorNofication("Đã bình luận");
                            }
                        }} >
                        Viết đánh giá
                    </button>

                    <div className="modal fade" ref={exampleModal} tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-lg mt-5">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Đánh giá</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => modal.hide()}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <textarea className="form-control" rows="3" placeholder="Mời bạn chia sẻ thêm một số cảm nhận..." name="comment" onChange={formik.handleChange}></textarea>
                                            {formik.errors.comment && formik.touched.comment && (
                                                <span><p style={{ color: "red" }}>{formik.errors.comment}</p></span>
                                            )}
                                        </div>

                                        {/* Start Rating */}
                                        <div className="row mt-1">
                                            <div className="col-md-4">
                                                <span>Bạn thấy sản phẩm như thế nào?</span>
                                                <span>(chọn sao nhé):</span>
                                            </div>
                                            <div className="col-md-8 text-center">
                                                {
                                                    [...Array(5)].map((start, index) => (
                                                        <label key={index}>
                                                            <input type="radio"
                                                                name="rating"
                                                                onClick={() => {
                                                                    setRating(index + 1)
                                                                    formik.setFieldValue("star", index + 1)
                                                                }}
                                                            />
                                                            <FaStar size={45}
                                                                className="star p-1 mt-2"
                                                                color={index + 1 <= (rating || ratingChange) ? "#ffc107" : "#e4e5e9"}
                                                                onMouseEnter={() => { setRatingChange(index + 1) }}
                                                                onMouseLeave={() => { setRatingChange(null) }}
                                                            />
                                                            <p>
                                                                <small style={{ fontWeight: 'bold', color: index + 1 === rating ? 'orange' : '' }}>{index + 1 === 1 ? "Rất tệ"
                                                                    : index + 1 === 2 ? "Tệ"
                                                                        : index + 1 === 3 ? "Ổn"
                                                                            : index + 1 === 4 ? "Tốt"
                                                                                : "Rất tốt"
                                                                }</small>
                                                            </p>
                                                        </label>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        {/* End Rating */}

                                        <div className="row mt-2 mb-3">
                                            <div className="mb-2">
                                                <span><h6>Thông tin cá nhân:</h6></span>
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Họ và tên(bắt buộc)" name="name" onChange={formik.handleChange} />
                                                {formik.errors.name && formik.touched.name && (
                                                    <span><p style={{ color: "red" }}>{formik.errors.name}</p></span>
                                                )}
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Số điện thoại(bắt buộc)" name="phone" onChange={formik.handleChange} />
                                                {formik.errors.phone && formik.touched.phone && (
                                                    <span><p style={{ color: "red" }}>{formik.errors.phone}</p></span>
                                                )}
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Email(bắt buộc)" name="email" onChange={formik.handleChange} />
                                                {formik.errors.email && formik.touched.email && (
                                                    <span><p style={{ color: "red" }}>{formik.errors.email}</p></span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button variant="primary" type="submit" className="btn btn-primary mt-2 me-2"
                                                disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ?
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    /> : ""}
                                                Gửi đánh giá
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Add Comment*/}
                </div>
            </div>
        </div>
    );
}

export default Rating;