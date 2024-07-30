# Employee Registry

This project is backend only.



## Schemas

### Employee Schema
Details about the employee including personal information and references to related schemas.

### Address Schema
Stores address information related to employees.

### Office Schema
Contains information about different office locations.

### Role Schema
Defines various roles and their responsibilities within the organization.



## API Endpoints

### Employee Endpoints

- `GET /employee`
  - Returns all employees (no reference data included).

- `GET /employee?full=true`
  - Returns all employees including address, office, and roles.

### Role Endpoints

- `GET /role`
  - Returns all roles (no reference data included).

- `GET /role?full=true`
  - Returns roles and includes employees who have the roles.

- `GET /role/:id/employees`
  - Returns all employees that have the given role.

### Office Endpoints

- `GET /office`
  - Returns all offices (no reference data included).

- `GET /office/:id/employees`
  - Returns all employees that have the given office.
