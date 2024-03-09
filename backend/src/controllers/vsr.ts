import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { AuthError } from "src/errors/auth";
import { ServiceError } from "src/errors/service";
import UserModel from "src/models/user";
import createHttpError from "http-errors";
import VSRModel from "src/models/vsr";
import validationErrorParser from "src/util/validationErrorParser";

export const getAllVSRS: RequestHandler = async (req, res, next) => {
  try {
    const vsrs = await VSRModel.find();

    res.status(200).json({ vsrs });
  } catch (error) {
    next(error);
  }
};

export const getVSR: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vsr = await VSRModel.findById(id);

    if (vsr === null) {
      throw createHttpError(404, "VSR not found at id " + id);
    }
    res.status(200).json(vsr);
  } catch (error) {
    next(error);
  }
};

export const createVSR: RequestHandler = async (req, res, next) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const {
    name,
    gender,
    age,
    maritalStatus,
    spouseName,
    agesOfBoys,
    agesOfGirls,
    ethnicity,
    employmentStatus,
    incomeLevel,
    sizeOfHome,
  } = req.body;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    // Get the current date as a timestamp for when VSR was submitted
    const currentDate = new Date();

    const vsr = await VSRModel.create({
      name,
      gender,
      age,
      maritalStatus,
      spouseName,
      agesOfBoys,
      agesOfGirls,
      ethnicity,
      employmentStatus,
      incomeLevel,
      sizeOfHome,

      // Use current date as timestamp for received & updated
      dateReceived: currentDate,
      lastUpdated: currentDate,

      status: "Received",
    });

    // 201 means a new resource has been created successfully
    // the newly created VSR is sent back to the user
    res.status(201).json(vsr);
  } catch (error) {
    next(error);
  }
};

export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    // extract any errors that were found by the validator
    const errors = validationResult(req);
    const { status } = req.body;

    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const { id } = req.params;
    const vsr = await VSRModel.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(vsr);
  } catch (error) {
    next(error);
  }
};

export const deleteVSR: RequestHandler = async (req, res, next) => {
  try {
    const uid = req.body.uid;
    const user = await UserModel.findOne({ uid: uid });
    if (!user) {
      throw ServiceError.USER_NOT_FOUND;
    }

    const { role } = user;
    if (role != "admin") {
      throw AuthError.NOT_ADMIN;
    }

    const vsrId = req.params.id;
    await VSRModel.findByIdAndDelete(vsrId);
    return res.status(200).json({
      message: `successfully deleted vsr ${vsrId}`,
    });
  } catch (e) {
    next();
  }
};
