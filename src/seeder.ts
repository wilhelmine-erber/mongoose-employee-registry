import {faker} from '@faker-js/faker';
import { connect } from './db';
import { Role } from './models/Roles';
import { Office } from './models/Office';
import { Employee } from './models/Employee';
import { Address, IAddress} from './models/Address';


async function main(){
    await connect();

    await Role.deleteMany();
    await Office.deleteMany();
    await Employee.deleteMany();
    await Address.deleteMany();

    await Role.insertMany([
        { name: 'Developer'},
        { name: 'Manager'},
        { name: 'Marketing'},
        { name: 'HR'},
        { name: 'Management'},
    ]);

    // Array.from() | split() => [15x{...}]
    const addresses: IAddress[] = Array.from({length: 15}, ()=>({
        streetName: faker.location.street(),
        streetNumber: faker.location.buildingNumber(),
        areaCode: parseInt(faker.location.zipCode()),
        city: faker.location.city(),
    }))

    await Address.insertMany(addresses);

    // get address from database
    for(let i=0; i<3; i++){
        const contactAddress = await Address.findOne({
            office: {$exists: false},
        });
        const office = await Office.create({ contactAddress: contactAddress?._id});
        await contactAddress?.updateOne({ office: office._id});
    }

    // 15 employees for office
    const office = await Office.findOne();

    // find address with no employee
    for(let i=0;i<15;i++){
        const contactAddress = await Address.findOne({
            employee: {$exists: false},
        });

        // random collection
        const roles = await Role.aggregate().sample(2).exec();
        const employee = await Employee.create({
            office: office?.id,
            contactAdress: contactAddress?.id,
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            position: faker.person.jobTitle(),
            roles: roles.map((role) => role._id)
        });

        await Promise.all(
            roles.map((role) => Role.findByIdAndUpdate(role._id, {
                $push: {employee: employee._id},
            }))
        );
        await contactAddress?.updateOne({employee: employee._id});
    }

    console.log('Database seeded!');
}


main().then(()=>process.exit(0))