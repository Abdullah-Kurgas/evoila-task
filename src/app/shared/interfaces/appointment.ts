export interface Appointment {
    id: string,
    date: string,
    maxInviteeCount: number,
    attendeeCount: number,
    showContactInformation: boolean,
    contact: Contact,
    property: Property,
}

interface Property {
    id: string,
    name: string,
    inviteeCount: number,
    address: Address,
    attachments: any[],
    user: {
        profile: Profile,
        usertype: string,
    }
}

interface Contact {
    firstName: string,
    name: string,
    email: string,
    mobile: string,
    phone: string,
    address: {},
    fullName: string
}

interface Address {
    street: string,
    houseNumber: string,
    city: string,
    country: string,
    zipCode: string,
}

interface Profile {
    firstname: string,
    name: string,
    phone: string,
    gender: string,
    title: string
}



