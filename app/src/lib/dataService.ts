import { isValid, parseISO } from 'date-fns';
import _ from 'lodash';
import Papa, { type ParseResult } from 'papaparse';

export interface Entity {
  uen: string;
  issuance_agency_id: string;
  entity_name: string;
  entity_type_description: string;
  business_constitution_description: string;
  company_type_description: string;
  paf_constitution_description: string;
  entity_status_description: string;
  registration_incorporation_date: Date | null;
  uen_issue_date: Date | null;
  address_type: string;
  block: string;
  street_name: string;
  level_no: string;
  unit_no: string;
  building_name: string;
  postal_code: number | null;
  other_address_line1: string;
  other_address_line2: string;
  account_due_date: Date | null;
  annual_return_date: Date | null;
  primary_ssic_code: number | null;
  primary_ssic_description: string;
  primary_user_described_activity: string;
  secondary_ssic_code: number | null;
  secondary_ssic_description: string;
  secondary_user_described_activity: string;
  no_of_officers: number | null;
  former_entity_name1: string;
  former_entity_name2: string;
  former_entity_name3: string;
  former_entity_name4: string;
  former_entity_name5: string;
  former_entity_name6: string;
  former_entity_name7: string;
  former_entity_name8: string;
  former_entity_name9: string;
  former_entity_name10: string;
  former_entity_name11: string;
  former_entity_name12: string;
  former_entity_name13: string;
  former_entity_name14: string;
  former_entity_name15: string;
  uen_of_audit_firm1: string;
  name_of_audit_firm1: string;
  uen_of_audit_firm2: string;
  name_of_audit_firm2: string;
  uen_of_audit_firm3: string;
  name_of_audit_firm3: string;
  uen_of_audit_firm4: string;
  name_of_audit_firm4: string;
  uen_of_audit_firm5: string;
  name_of_audit_firm5: string;
}

class DataService {
  private entities: Entity[] = [];
  private loaded = false;

  private parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === 'na') return null;
    const date = parseISO(dateStr);
    return isValid(date) ? date : null;
  }

  private parseNumber(numStr: string): number | null {
    if (!numStr || numStr === 'na') return null;
    const num = parseFloat(numStr);
    return isNaN(num) ? null : num;
  }

  private async loadCSV(filePath: string): Promise<Entity[]> {
    console.log(`DataService: loadCSV started for ${filePath}`);
    try {
      console.log(`DataService: Fetching ${filePath}`);
      const response = await fetch(filePath);
      console.log(`DataService: Fetch response for ${filePath}: ${response.status} ${response.statusText}`);
      if (!response.ok) {
        console.error(`DataService: Fetch failed for ${filePath}: ${response.statusText}`);
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      const csvText = await response.text();
      console.log(`DataService: ${filePath} fetched successfully, starting Papa.parse`);
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Record<string, string>>) => {
            if (results.errors.length > 0) {
              console.warn(`Errors parsing ${filePath}:`, results.errors);
            }
            const entities: Entity[] = results.data.map((row: Record<string, string>) => ({
              uen: row.uen || '',
              issuance_agency_id: row.issuance_agency_id || '',
              entity_name: row.entity_name || '',
              entity_type_description: row.entity_type_description || '',
              business_constitution_description: row.business_constitution_description || '',
              company_type_description: row.company_type_description || '',
              paf_constitution_description: row.paf_constitution_description || '',
              entity_status_description: row.entity_status_description || '',
              registration_incorporation_date: this.parseDate(row.registration_incorporation_date),
              uen_issue_date: this.parseDate(row.uen_issue_date),
              address_type: row.address_type || '',
              block: row.block || '',
              street_name: row.street_name || '',
              level_no: row.level_no || '',
              unit_no: row.unit_no || '',
              building_name: row.building_name || '',
              postal_code: this.parseNumber(row.postal_code),
              other_address_line1: row.other_address_line1 || '',
              other_address_line2: row.other_address_line2 || '',
              account_due_date: this.parseDate(row.account_due_date),
              annual_return_date: this.parseDate(row.annual_return_date),
              primary_ssic_code: this.parseNumber(row.primary_ssic_code),
              primary_ssic_description: row.primary_ssic_description || '',
              primary_user_described_activity: row.primary_user_described_activity || '',
              secondary_ssic_code: this.parseNumber(row.secondary_ssic_code),
              secondary_ssic_description: row.secondary_ssic_description || '',
              secondary_user_described_activity: row.secondary_user_described_activity || '',
              no_of_officers: this.parseNumber(row.no_of_officers),
              former_entity_name1: row.former_entity_name1 || '',
              former_entity_name2: row.former_entity_name2 || '',
              former_entity_name3: row.former_entity_name3 || '',
              former_entity_name4: row.former_entity_name4 || '',
              former_entity_name5: row.former_entity_name5 || '',
              former_entity_name6: row.former_entity_name6 || '',
              former_entity_name7: row.former_entity_name7 || '',
              former_entity_name8: row.former_entity_name8 || '',
              former_entity_name9: row.former_entity_name9 || '',
              former_entity_name10: row.former_entity_name10 || '',
              former_entity_name11: row.former_entity_name11 || '',
              former_entity_name12: row.former_entity_name12 || '',
              former_entity_name13: row.former_entity_name13 || '',
              former_entity_name14: row.former_entity_name14 || '',
              former_entity_name15: row.former_entity_name15 || '',
              uen_of_audit_firm1: row.uen_of_audit_firm1 || '',
              name_of_audit_firm1: row.name_of_audit_firm1 || '',
              uen_of_audit_firm2: row.uen_of_audit_firm2 || '',
              name_of_audit_firm2: row.name_of_audit_firm2 || '',
              uen_of_audit_firm3: row.uen_of_audit_firm3 || '',
              uen_of_audit_firm4: row.uen_of_audit_firm4 || '',
              name_of_audit_firm3: row.name_of_audit_firm3 || '',
              uen_of_audit_firm5: row.uen_of_audit_firm5 || '',
              name_of_audit_firm4: row.name_of_audit_firm4 || '',
              name_of_audit_firm5: row.name_of_audit_firm5 || '',
            }));
            console.log(`DataService: Papa.parse complete for ${filePath}`);
            resolve(entities);
          },
          error: (error: unknown) => {
            const err = error as { message: string };
            console.error(`DataService: Papa.parse error for ${filePath}: ${err.message}`);
            reject(new Error(`Error parsing ${filePath}: ${err.message}`));
          },
        });
      });
    } catch (error) {
      console.error(`DataService: loadCSV failed for ${filePath}:`, error);
      throw new Error(`Failed to load CSV ${filePath}: ${error}`);
    }
  }

  async loadAllData(progressCallback?: (progress: number) => void): Promise<void> {
    console.log('DataService: loadAllData started');
    if (this.loaded) {
      console.log('DataService: Data already loaded, returning.');
      if (progressCallback) progressCallback(100);
      return;
    }

    const csvFiles = [
      '/data/ACRACorporateListLive.csv',
    ];

    const allEntities: Entity[] = [];
    let loadedCount = 0;
    console.log('DataService: Starting CSV file loop');
    for (const file of csvFiles) {
      console.log(`DataService: Loading file: ${file}`);
      try {
        const entities = await this.loadCSV(file);
        console.log(`DataService: Successfully loaded and parsed ${file}`);
        for (const entity of entities) {
          allEntities.push(entity);
        }
      } catch (error) {
        console.error(`DataService: Failed to load ${file} in loadAllData loop:`, error);
        // Continue with other files
      }
      loadedCount++;
      if (progressCallback) {
        progressCallback((loadedCount / csvFiles.length) * 100);
      }
    }
    console.log('DataService: CSV file loop finished');

    this.entities = allEntities;
    this.loaded = true;
    console.log('DataService: All data loaded and processed.');
  }

  getAllEntities(): Entity[] {
    return this.entities;
  }

  filterEntities(predicate: (entity: Entity) => boolean): Entity[] {
    return _.filter(this.entities, predicate);
  }

  aggregateByStatus(): Record<string, number> {
    return _.countBy(this.entities, 'entity_status_description');
  }

  aggregateByType(): Record<string, number> {
    return _.countBy(this.entities, 'entity_type_description');
  }

  aggregateBySSIC(): Record<string, number> {
    return _.countBy(this.entities, (entity: Entity) => entity.primary_ssic_code?.toString() || 'Unknown');
  }

  // Memoized functions for performance
  getEntitiesByStatus = _.memoize((status: string) => this.filterEntities(e => e.entity_status_description === status));

  getEntitiesByType = _.memoize((type: string) => this.filterEntities(e => e.entity_type_description === type));

  getEntitiesBySSIC = _.memoize((ssic: number) => this.filterEntities(e => e.primary_ssic_code === ssic));

  getUniqueEntityTypes(): string[] {
    return _.uniq(this.entities.map(e => e.entity_type_description)).filter(Boolean);
  }

  getUniqueStatuses(): string[] {
    return _.uniq(this.entities.map(e => e.entity_status_description)).filter(Boolean);
  }

  getUniqueSSICs(): number[] {
    return _.uniq(this.entities.map(e => e.primary_ssic_code).filter(Boolean)) as number[];
  }

  getUniqueSSICWithOptions(): { value: number; label: string }[] {
    const uniqueOptions: { value: number; label: string }[] = [];
    const seenCodes = new Set<number>();

    for (const entity of this.entities) {
      const code = entity.primary_ssic_code;
      const description = entity.primary_ssic_description;

      if (code !== null && code !== undefined && description && description.trim() !== '' && description.trim().toLowerCase() !== 'na' && !seenCodes.has(code)) {
        uniqueOptions.push({ value: code, label: `${description} (${code})` });
        seenCodes.add(code);
      }
    }
    // Optionally sort the options by label
    return uniqueOptions.sort((a, b) => a.label.localeCompare(b.label));
  }
}

export const dataService = new DataService();