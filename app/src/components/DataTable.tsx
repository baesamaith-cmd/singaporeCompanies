import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { Link } from 'react-router-dom';
import type { Entity } from '../lib/dataService';

interface DataTableProps {
  entities: Entity[];
}

const DataTable: React.FC<DataTableProps> = ({ entities }) => {
  const displayEntities = entities.slice(0, 100); // Limit for performance

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entity Data ({entities.length} entries)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UEN</TableHead>
              <TableHead>Entity Name</TableHead>
              <TableHead>Business Constitution</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>SSIC Code</TableHead>
              <TableHead>SSIC Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayEntities.map((entity) => (
              <TableRow key={entity.uen}>
                <TableCell><Link to={`/entity/${entity.uen}`} className="text-blue-500 hover:underline">{entity.uen}</Link></TableCell>
                <TableCell>{entity.entity_name}</TableCell>
                <TableCell>{entity.business_constitution_description}</TableCell>
                <TableCell>{entity.entity_status_description}</TableCell>
                <TableCell>{entity.registration_incorporation_date?.toLocaleDateString()}</TableCell>
                <TableCell>{entity.primary_ssic_code}</TableCell>
                <TableCell>{entity.primary_ssic_description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;