import prisma from "../prismadb";
import { syncCarFromDLBD } from "./car";
import { getGarageByDlbdId } from "./garage";
export async function createCustomer(json: any) {
  try {
    const customer = await prisma.customer.create({
      data: {
        fullName: json.fullName,
        phoneNumber: json.phoneNumber,
        cityId: Number(json.cityId),
        districtId: Number(json.districtId),
        wardId: Number(json.wardId),
        address: json.address,
        dob: json.dob,
        description: json.description,
        sex: json.sex,
        garageId: Number(json.garageId),
        status: json.status,
      },
      include: {
        cars: true,
      },
    });
    return { customer };
  } catch (error) {
    return { error };
  }
}

export async function getCustomers(requestData: any) {
  let customerGroup = {};
  let currentPage = 1;
  if (requestData.page) {
    currentPage = Number(requestData.page);
  }
  let take = 10;
  let limit = 10;
  if (requestData.limit) {
    take = parseInt(requestData.limit);
  }
  const skip = take * (currentPage - 1);
  let titleFilter = "";
  if (requestData.s) {
    titleFilter = requestData.s;
  }
  let garageId = {};
  if (requestData.garageId) {
    garageId = requestData.garageId;
  }
  let status = {
    not: "DELETE",
  };
  if (requestData.status == "NOT_DELETE") {
    let status = {
      not: "DELETE",
    };
  } else if (requestData.status) {
    let status = {
      contains: requestData.status,
    };
  }

  if (requestData.customerGroup) {
    customerGroup = {
      some: {
        customerGroup: {
          id: Number(requestData.customerGroup),
        },
      },
    };
  }
  let phoneNumber = {}
  if(requestData.phoneNumber){
    phoneNumber = requestData.phoneNumber
  }
  const [customers, total] = await prisma.$transaction([
    prisma.customer.findMany({
      take: take,
      skip: skip,
      orderBy: {
        id: "desc",
      },
      where: {
        AND: [
          {
            fullName: {
              contains: titleFilter
            },
            phoneNumber,
            garageId: garageId,
            customerGroup,
          },
        ],
      },
      include: {
        cars: true,
      },
    }),
    prisma.customer.count({
      where: {
        AND: [
          {
            fullName: {
              contains: titleFilter,
            },
            garageId: garageId,
            customerGroup,
            // status: ,
          },
        ],
      },
    }),
  ]);
  const totalPage = Math.ceil(total / limit);

  return {
    data: customers,
    total: total,
    currentPage: currentPage,
    limit: limit,
    totalPage: totalPage,
    status: 200,
  };
}
export async function getCustomersAutoComplete(requestData: any) {
  let titleFilter = "";
  if (requestData.s) {
    titleFilter = requestData.s;
  }
  let garageId = {};
  if (requestData.garageId) {
    garageId = requestData.garageId;
  }
  return await prisma.customer.findMany({
      take: 10,
      orderBy: {
        id: "desc",
      },
      where: {
        OR: [
          {
            fullName: {
              contains: titleFilter
            },
            garageId,
            status: 'PUBLIC'
          },
          {
            phoneNumber: {
              contains: titleFilter
            },
            garageId,
            status: 'PUBLIC'
          },
        ],
      },
    });
}

export async function getMyCustomers(phoneNumber: string) {
  const rs = await prisma.customer.findMany({
    where: {
      phoneNumber,
      status: {
        not: 'DELETE'
      }
    }
  });
  return rs;
}

export async function showCustomer(id:number) {
  return await prisma.customer.findFirst({
    where: {
      id
    },
    include:{
      customerGroup: true,
      cars: true
    }
  })
}

export async function syncCustomerFromDLBD(requestData: any) {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        status: "PUBLIC",
        phoneNumber: {
          contains: requestData.phone_number,
        },
      },
    });
    if (customer) {
      return customer;
    } else {
      const garage = await getGarageByDlbdId(requestData.garage_id);
      if (garage) {
        const customerNew = await prisma.customer.create({
          data: {
            fullName: requestData.name,
            phoneNumber: requestData.phone_number,
            cityId: requestData.province_id,
            districtId: requestData.district_id,
            wardId: requestData.ward_id,
            address: requestData.address,
            description: requestData.description,
            garageId: garage.id,
          },
        });
        return customerNew;
      }
    }
  } catch (error) {
    return { error };
  }
}

export async function getCustomerByPhone(
  phoneNumber: string,
  garageId: Number
) {
  const customer = await prisma.customer.findFirst({
    where: {
      phoneNumber,
      garageId: Number(garageId),
      status: {
        not: "DELETE",
      },
    },
  });
  return customer;
}

export async function syncCustomerAndCarFromDLBD(requestData: any) {
  try {
    const garage = await getGarageByDlbdId(requestData.customer.garage_id);
    if (garage) {
      const customer = await syncCustomerFromDLBD(requestData.customer);
      if (customer) {
        const car = await syncCarFromDLBD(
          requestData.car,
          requestData.customer
        );
        return { customer, car };
      }
    }
  } catch (error) {
    return { error };
  }
}
