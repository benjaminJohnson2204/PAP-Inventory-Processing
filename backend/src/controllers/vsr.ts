import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { AuthError } from "src/errors/auth";
import { ServiceError } from "src/errors/service";
import UserModel from "src/models/user";
import VSRModel from "src/models/vsr";
import validationErrorParser from "src/util/validationErrorParser";

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
    const date = new Date();

    const vsr = await VSRModel.create({
      name,
      date,
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
    });

    // 201 means a new resource has been created successfully
    // the newly created VSR is sent back to the user
    res.status(201).json(vsr);
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