import React, {useState} from "react";
import type {User} from "../types/api-schema.zod.ts";
import {User as userSchema} from "../types/api-schema.zod.ts";

const requiredUserSchema = userSchema.required();

const UserDataForm: React.FC<{ onSubmit: (data: User) => void }> = ({onSubmit}) => {
    const [formValues, setFormValues] = useState<User>({});
    const [formErrors, setFormErrors] = useState<Partial<User>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = requiredUserSchema.safeParse(formValues);

        console.log(result.error?.issues);

        if (!result.success) {
            const errors: Partial<User> = {};
            result.error?.issues.forEach((issue) => {
                const key: string | number = issue.path[0];
                // @ts-ignore
                errors[key] = issue.message;
            })
            setFormErrors(errors);
            return;
        }

        onSubmit(result.data);
    };

    console.log({formErrors, formValues});

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                />
                {formErrors.username && <small>{formErrors.username}</small>}
            </label>

            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                />
                {formErrors.firstName && <small>{formErrors.firstName}</small>}
            </label>

            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                />
                {formErrors.lastName && <small>{formErrors.lastName}</small>}
            </label>

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                {formErrors.email && <small>{formErrors.email}</small>}
            </label>

            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {formErrors.password && <small>{formErrors.password}</small>}
            </label>

            <label>
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default UserDataForm;