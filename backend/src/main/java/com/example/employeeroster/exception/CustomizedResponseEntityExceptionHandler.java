package com.example.employeeroster.exception;

import com.example.employeeroster.utils.ErrorDetail;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;

@RestControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorDetail> handleAllException(Exception ex, WebRequest request) throws Exception { //default exception from ResponseEntityExceptionHandler -- so we overridden
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<ErrorDetail> handleRuntimeExceptionException(Exception ex, WebRequest request) throws Exception { //default exception from ResponseEntityExceptionHandler -- so we overridden
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(MonthRosterNotFoundException.class)
    public final ResponseEntity<ErrorDetail> handleMonthRosterNotFoundException(Exception ex, WebRequest request) throws Exception { //default exception from ResponseEntityExceptionHandler -- so we overridden
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(DuplicateKeyException.class)
    public final ResponseEntity<ErrorDetail> handleDuplicateKeyException(Exception ex, WebRequest request) throws Exception {
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    public final ResponseEntity<ErrorDetail> handleUserAlreadyExistsException(Exception ex, WebRequest request) throws Exception {
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(RosterAlreadyExistsException.class)
    public final ResponseEntity<ErrorDetail> handleRosException(Exception ex, WebRequest request) throws Exception {
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<ErrorDetail> handleUserNotFoundException(Exception ex, WebRequest request) throws Exception {
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ErrorDetail errorDetail = new ErrorDetail(LocalDate.now(),"Total Errors:"+ex.getErrorCount()+" First Error " +ex.getFieldError().getDefaultMessage(),request.getDescription(false));

        return new ResponseEntity<>(errorDetail,HttpStatus.BAD_REQUEST);
    }
}
