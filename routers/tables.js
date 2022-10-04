const { Router } = require("express");
const { Op } = require("sequelize");
const authMiddleware = require("../auth/middleware");;
const Users = require("../models/").user
const Tables = require("../models/").table;
const Reservations = require("../models/").reservation;

const router = new Router();

// Table reservation endpoint
router.post("/reserve", authMiddleware, async (req, res, next) => {

  const { date, tableId } = req.body
  const userId = req.user.id
  try {
    const reserveTable = await Reservations.create({ date: date, tableId: parseInt(tableId), userId: userId });
    if (reserveTable) {
      return res.status(200).send({ message: "ok", reserveTable })
    } else {
      return res.status(400).send({ message: "Sorry, we couldn't process your reserve, try again" })
    }
  } catch (error) {
    next(error)
  }
});


// Get reserved tables endpoint
router.get("/reserved/:date", authMiddleware, async (req, res, next) => {
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).send({ status: "Forbidden", message: "Sorry, not allowed to perform this action" })
    };

    const getReservedTables = await Reservations.findAll({
      where: {
        date: {
          [Op.gte]: req.params.date
        }
      },
      order: [["date", "ASC"]],
      include: { model: Users, attributes: ['name', 'email'] }
    });

    return res.status(200).send(getReservedTables)

  } catch (error) {
    return res.status(404).send({ status: "fail", message: "Sorry, we couldn't find reservations" })
  }
});

// Cancel Reservation endpoint
router.delete("/reserve/cancel/:reservationId", authMiddleware, async (req, res, next) => {
  try {
    const resId = parseInt(req.params.reservationId)
    if (req.user.isAdmin === false) {
      return res.status(403).send({ status: "Forbidden", message: "Sorry, not allowed to perform this action" })
    }

    const getReservation = await Reservations.findByPk(resId);
    if (getReservation) {
      const cancelRes = await Reservations.destroy({ where: { id: resId } })
      return res.status(200).send({ status: "ok", message: "Sorry, Reservation Cancelled", cancelRes: cancelRes })
    } else {
      return res.status(404).send({ status: "fail", message: "Sorry, Reservation Not Found" })
    }
  } catch (error) {
    return res.status(404).send({ status: "fail", message: "Sorry, We couldn't cancel that reservation" })
  }
});

// Get tables endpoint
router.get("/:date", async (req, res, next) => {
  const date = req.params.date
  try {
    const getTables = await Tables.findAll({ include: { model: Reservations, required: false, where: { date: date }, attributes: ['date', 'tableId'] } });
    return res.status(200).send(getTables)

  } catch (error) {
    console.log(error)
    return res.status(404).send({ status: "fail", message: "Sorry, We couldn't find tables" })
  }
});


module.exports = router;